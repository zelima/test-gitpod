import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { articleEditActions } from './article-edit.actions';

export const publishArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesService = inject(ArticlesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) => {
        // Check if tagList is a string and create a new object with the modified tagList
        let newData = data;
        if (typeof data.tagList === 'string') {
          newData = {
            ...data,
            tagList: data.tagList.split(',').map((tag: string) => tag.trim()),
          };
        }
        return articlesService.publishArticle(newData).pipe(
          tap((result) => router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        );
      }),
    );
  },
  { functional: true },
);
