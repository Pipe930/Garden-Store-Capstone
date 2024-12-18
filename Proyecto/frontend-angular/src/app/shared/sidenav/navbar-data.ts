import { Sidenav } from "@core/interfaces/sidenav"

export const navbarData: Array<Sidenav> = [
  {
    routerLink: "dashboard",
    icon: "bx bxs-dashboard",
    label: "Dashboard",
    items: []
  },
  {
    routerLink: "categories",
    icon: "bx bxs-category",
    label: "Categorias",
    items: [
      {
        routerLink: "categories/list",
        label: "Lista Categorias",
      },
      {
        routerLink: "categories/create",
        label: "Crear Categoria",
      }
    ]
  },
  {
    routerLink: "products",
    icon: "bx bxl-product-hunt",
    label: "Productos",
    items: [
      {
        routerLink: "products/list",
        label: "Lista Productos",
      },
      {
        routerLink: "products/create",
        label: "Crear Producto",
      }
    ]
  },
  {
    routerLink: "offers",
    icon: "bx bxs-offer",
    label: "Ofertas",
    items: [
      {
        routerLink: "offers/list",
        label: "Lista Ofertas",
      },
      {
        routerLink: "offers/create",
        label: "Crear Oferta",
      }
    ]
  },
  {
    routerLink: "users",
    icon: "bx bxs-user-circle",
    label: "Usuarios",
    items: [
      {
        routerLink: "users/list",
        label: "Lista Usuarios",
      },
      {
        routerLink: "users/create",
        label: "Crear Usuario",
      }
    ]
  },
  {
    routerLink: "access-control",
    icon: "bx bxs-shield",
    label: "Roles & Permisos",
    items: [
      {
        routerLink: "access-control/list",
        label: "Roles & Permisos"
      },
      {
        routerLink: "access-control/role/create",
        label: "Crear Rol"
      },
      {
        routerLink: "access-control/permission/create",
        label: "Crear Permiso",
      }
    ]
  },
  {
    routerLink: "branchs",
    icon: "bx bxs-store-alt",
    label: "Sucursales",
    items: [
      {
        routerLink: "branchs/list",
        label: "Lista Sucursales"
      }
    ]
  },
  {
    routerLink: "purchases",
    icon: "bx bxs-cart",
    label: "Compras",
    items: [
      {
        routerLink: "purchases/list",
        label: "Lista Compras"
      },
      {
        routerLink: "purchases/create",
        label: "Crear Compra"
      }
    ]
  },
  {
    routerLink: "employees",
    icon: "bx bxs-user-detail",
    label: "Empleados",
    items: [
      {
        routerLink: "employees/list",
        label: "Lista Empleados"
      },
      {
        routerLink: "employees/create",
        label: "Crear Empleado"
      }
    ]
  },
  {
    routerLink: "suppliers",
    icon: "bx bxs-truck",
    label: "Proveedores",
    items: [
      {
        routerLink: "suppliers/list",
        label: "Lista Proveedores"
      },
      {
        routerLink: "suppliers/create",
        label: "Crear Proveedor"
      }
    ]
  },
  {
    routerLink: "posts",
    icon: "bx bxs-news",
    label: "Publicaciones",
    items: [
      {
        routerLink: "posts/list",
        label: "Publicaciones y Etiquetas"
      },
      {
        routerLink: "posts/post/create",
        label: "Crear Publicación"
      },
      {
        routerLink: "posts/tag/create",
        label: "Crear Etiqueta"
      }
    ]
  },
  {
    routerLink: "orders",
    icon: "bx bxs-package",
    label: "Pedidos",
    items: [
      {
        routerLink: "orders/list",
        label: "Lista Pedidos"
      }
    ]
  },
  {
    routerLink: "sales",
    icon: "bx bx-trending-up",
    label: "Ventas",
    items: [
      {
        routerLink: "sales/list",
        label: "Lista Ventas"
      }
    ]
  }
]
