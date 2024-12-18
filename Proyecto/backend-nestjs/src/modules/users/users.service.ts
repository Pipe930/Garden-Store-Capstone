import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { ResponseData } from 'src/core/interfaces/response-data.interface';
import { Role, RoleUser } from '../access-control/models/rol.model';
import { Op } from 'sequelize';
import { PasswordService } from 'src/core/services/password.service';
import { Subscription } from '../subscriptions/models/subscription.model';
import { Permission } from '../access-control/models/permission.model';
import { Cart } from '../cart/models/cart.model';

@Injectable()
export class UsersService {

  constructor(private readonly _passwordService: PasswordService) {}

  async create(createUserDto: CreateUserDto) {

    const { firstName, lastName, email, phone, password, active, createdCart, roles } = createUserDto;

    await this.validateUser(email, phone);
    if(password !== createUserDto.rePassword) throw new BadRequestException("Las contraseñas no coinciden");

    try {      
      const newUser = await User.create<User>({
        firstName,
        lastName,
        email,
        phone,
        password: this._passwordService.passwordEncrypted(password),
        active
      });

      if(roles.length > 0){

        roles.forEach(async (role) => {

          await RoleUser.create<RoleUser>({
            idRole: role.idRole,
            idUser: newUser.idUser
          });
        });
      }

      if(createdCart) {
        await Cart.create<Cart>({
          idCartUser: newUser.idUser
        });
      }
    } catch (error) {
      throw new InternalServerErrorException("Error al crear el usuario");
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: "Usuario creado con exito"
    };
  }

  async findAll(): Promise<ResponseData> {

    const listUsers = await User.findAll<User>({
      attributes: ["idUser", "firstName", "lastName", "email", "phone", "active"],
      include: [
        {
          model: Role,
          attributes: ["idRole", "name"]
        }
      ]
    });

    if(listUsers.length === 0) return { message: "No tenemos usuarios registrados", statusCode: HttpStatus.NO_CONTENT }

    return {

      statusCode: HttpStatus.OK,
      count: listUsers.length,
      data: listUsers
    };
  }

  async findEmailUser(email: string): Promise<User>{

    const user = await User.findOne<User>({
      where: {
        email
      },
      include: [{
        model: Role,
        attributes: ["idRole", "name"]
      }]
    })

    return user;
  }

  async findOne(id: number): Promise<ResponseData> {

    const user = await User.findByPk<User>(id, {
      attributes: ["idUser", "firstName", "lastName", "email", "phone", "createdAt", "updatedAt", "lastLogin", "active"],
      include: [
        {
          model: Role,
          attributes: ["idRole", "name"]
        },
        {
          model: Subscription,
          attributes: ["status"]
        }
      ]
    });

    if(!user) throw new NotFoundException("Usuario no encontrado");

    return {
      message: "Usuario encontrado con exito",
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseData> {

    const { firstName, lastName, email, phone, active, roles } = updateUserDto;

    const user = await User.findByPk<User>(id, {
      include: [
        {
          model: Role,
          attributes: ["idRole"]
        }
      ]
    });

    if(!user) throw new NotFoundException("Usuario no encontrado");
    if(user.email !== email || user.phone !== phone) await this.validateUser(email, phone);

    try {      
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phone = phone;
      user.active = active;

      const currentRolesIds = user.rolesUser.map(r => r.idRole.toString());
      const newRolesIds = roles.map(r => r.idRole.toString());

      const areRolesEqual = currentRolesIds.length === newRolesIds.length &&
      currentRolesIds.every(id => newRolesIds.includes(id));

      if (!areRolesEqual) {
          
          const rolesToAdd = newRolesIds.filter(id => !currentRolesIds.includes(id));
          const rolesToRemove = currentRolesIds.filter(id => !newRolesIds.includes(id));
      
          for (let idRole of rolesToAdd) {
              await RoleUser.create<RoleUser>({
                  idUser: user.idUser,
                  idRole
              });
          }
  
          for (let idRole of rolesToRemove) {
              await RoleUser.destroy({
                  where: {
                      idUser: user.idUser,
                      idRole
                  }
              });
          }
      }

      await user.save();
    } catch (error) {
      throw new InternalServerErrorException("Error al actualizar el usuario");
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Usuario actualizado con exito"
    };
  }

  async getUserPermissions(idUser: number): Promise<Role[]>{

    const roles = await Role.findAll<Role>({
      include: [
        {
          model: User,
          where: {
            idUser
          }
        },
        {
          model: Permission
        }
      ]
    });
    
    return roles;
  }

  async getUserRoles(idUser: number): Promise<Role[]>{

    const roles = await Role.findAll<Role>({
      include: [
        {
          model: User,
          where: {
            idUser
          },
          attributes: []
        }
      ]
    });
    
    return roles;
  }

  private async validateUser(email: string, phone: string): Promise<void>{

    const user = await User.findOne<User>({
      where: {
        [Op.or]: {
          email,
          phone
        }
      }
    });

    if(user) throw new ConflictException("El email o el telefono ya estan registrados");
  }
}
