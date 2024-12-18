import { categoryColumns } from '@admin/interfaces/category-table';
import { CategoryService } from '@admin/services/category.service';
import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableColumns } from '@core/interfaces/table';
import { Category } from '@pages/interfaces/category';
import { TableComponent } from '@shared/table/table.component';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss'
})
export class ListCategoriesComponent {

  private readonly _router = inject(Router);
  private readonly _categoryService = inject(CategoryService);

  public listCategories = signal<Category[]>([]);
  public columns = signal<TableColumns[]>(categoryColumns);
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(result => {
      if(result.statusCode === HttpStatusCode.Ok) this.listCategories.set(result.data);
      this.isLoading.set(true);
    })
  }

  public editCategory(event: Category):void{
    this._router.navigate(["/admin/categories/edit", event.idCategory]);
  }
}
