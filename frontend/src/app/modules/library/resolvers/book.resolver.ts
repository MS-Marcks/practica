import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BookService } from "../services/book.service";

/**
 * Description solving and obtaining data from a book
 *
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 * @returns {*}
 */
export const BookResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  return inject(BookService).getBook(route.paramMap.get('id')!);
};
