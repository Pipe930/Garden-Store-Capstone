import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateStockBranchDto } from './dto/create-stock-branch.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('branchs')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Post()
  create(@Body() createStockBranchDto: CreateStockBranchDto) {
    return this.branchService.createStockBranch(createStockBranchDto);
  }

  @Get('stock/:idBranch/:idProduct')
  branchStock(@Param('idBranch', ParseIntPipe) idBranch: number, @Param('idProduct', ParseIntPipe) idProduct: number) {
    return this.branchService.getStockBranch(idBranch, idProduct);
  }

  @Post('employee')
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.branchService.createEmployee(createEmployeeDto);
  }

  @Get('employees/:idBranch')
  findEmployees(@Param('idBranch', ParseIntPipe) id: number) {
    return this.branchService.findEmployeesByBranch(id);
  }

  @Put('employee/:id')
  updateEmployee(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.branchService.updateEmployee(id, updateEmployeeDto);
  }

  @Get('employee/:id')
  findEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.findOneEmployee(id);
  }
}
