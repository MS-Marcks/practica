import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BookService } from "../services/library/book.service";

export const BookResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  return inject(BookService).getBook(route.paramMap.get('id')!);
};
