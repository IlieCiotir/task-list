import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromTaskStore from './reducers';
import { TaskListEffects } from './task-manager/task-list/model/task-list.effects';
import { taskListFeature } from './task-manager/task-list/model/task-list.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideStore(fromTaskStore.reducers, { metaReducers: fromTaskStore.metaReducers }),
    provideEffects(),
    provideState(taskListFeature),
    provideEffects(TaskListEffects),
  ]
};
