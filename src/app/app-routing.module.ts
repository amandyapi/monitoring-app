
import { NgModule } from '@angular/core';
import { Routes, RouterModule } 
from '@angular/router';
import { AuthGuard } 
from '../app/services/auth.guard';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
	{
		path: '',
		component: FullComponent,
		children: [
			{ path: '', redirectTo: '/authentication/login', pathMatch: 'full', },
			{
				path: 'dashboard',canActivate:[AuthGuard] ,
				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'starter',canActivate:[AuthGuard] ,
				loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
			},
			{
				path: 'component',canActivate:[AuthGuard],
				loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
			},
			{ path: 'cards',canActivate:[AuthGuard] , loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
			{ path: 'icons',canActivate:[AuthGuard] , loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
			{ path: 'forms',canActivate:[AuthGuard] , loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
			{ path: 'tables',canActivate:[AuthGuard] , loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
			{ path: 'charts',canActivate:[AuthGuard] , loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
			{
				path: 'widgets',canActivate:[AuthGuard] ,
				loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
			},
			{ path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
			{
				path: 'timeline',
				loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
			},
			{
				path: 'extra-component',
				loadChildren:
					() => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
			},
			{ path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
			{ path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule) },
			{ path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
			{
				path: 'sample-pages',
				loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
			},
			{
				path: 'sub-child',
				loadChildren: () => import('./sub-child/sub-child.module').then(m => m.SubchildModule)
			}
		]
	},
	{
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: '/authentication/404'
	}
];
