import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
        transition('DetailsPage => HomePage', [
          style({position: 'relative'}),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            })
          ]),
          query(':enter', [
            style({left: '-100%'})
          ]),
          query('@*', animateChild()),
          group([
            query(':leave', [
              animate('450ms ease-out', style({left: '100%'}))
            ]),
            query(':enter', [
              animate('450ms ease-out', style({left: '0%'}))
            ])
          ]),
          query('@*', animateChild()),
        ]),
        transition('HomePage => DetailsPage', [
          style({position: 'relative'}),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            })
          ]),
          query(':enter', [
            style({left: '100%'})
          ]),
          query('@*', animateChild()),
          group([
            query(':leave', [
              animate('450ms ease-out', style({left: '-100%'}))
            ]),
            query(':enter', [
              animate('450ms ease-out', style({left: '0%'}))
            ])
          ]),
          query('@*', animateChild()),
        ])
      ]
    )
  ]
})
export class AppComponent {
  title = 'Youtube Channels Explorer';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
