import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent } from '../ui/icon.component';
import { NavigationComponent } from '../ui/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconComponent, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg width="0" height="0" viewBox="0 0 0 0">
      <title>Re-Use SVG Defs as Resource</title>
      <defs>
        <filter id="uncommon">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02; 0.05; 0.02"
              dur="6s"
              repeatCount="indefinite"
            />
          </feTurbulence>

          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10">
            <animate
              attributeName="scale"
              values="10; 15; 10"
              dur="6s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
        <filter id="rare">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.15"
            numOctaves="3"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.1; 0.2; 0.1"
              keyTimes="0; 0.5; 1"
              dur="6s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              values="0; 100; 0"
              keyTimes="0; 0.5; 1"
              dur="6s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
        <filter id="epic">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.05;0.1;0.05"
              keyTimes="0;0.5;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          >
            <animate
              attributeName="scale"
              values="0;100;0"
              keyTimes="0;0.5;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          <feMerge>
            <feMergeNode in="displacement" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="legendary"
          filterUnits="objectBoundingBox"
          x="0%"
          y="-100%"
          width="100%"
          height="500%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
            stitchTiles="stitch"
          />
          <feOffset dy="0" result="off1">
            <animate
              attributeType="XML"
              attributeName="dy"
              from="0"
              to="-500"
              dur="4s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feOffset in="noise" dy="00" result="off2">
            <animate
              attributeType="XML"
              attributeName="dy"
              from="400"
              to="0"
              dur="4s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feMerge result="scrolling-noise">
            <feMergeNode in="off1" />
            <feMergeNode in="off2" />
          </feMerge>
          <feComponentTransfer result="brighter-noise">
            <feFuncA type="gamma" amplitude="1" exponent="2" />
          </feComponentTransfer>
          <feComposite
            in="SourceGraphic"
            in2="brighter-noise"
            operator="in"
            result="gradient-noise"
          />
          <feComponentTransfer result="threshhold">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feFlood flood-color="#ff9" result="yellow" />
          <feComposite
            in2="threshhold"
            in="yellow"
            operator="in"
            result="yellow-threshhold"
          />
          <feFlood flood-color="#FFD700" result="red" />
          <feComponentTransfer in="SourceGraphic" result="exponent-gradient">
            <feFuncA type="gamma" exponent="0" />
          </feComponentTransfer>
          <feComposite
            in="red"
            in2="exponent-gradient"
            operator="in"
            result="red-gradient"
          />
          <feComposite
            in2="threshhold"
            in="red-gradient"
            operator="in"
            result="red-gradient-threshhold"
          />
          <feMerge>
            <feMergeNode in="yellow-threshhold" />
            <feMergeNode in="red-gradient-threshhold" />
          </feMerge>
        </filter>
        <filter id="mythic">
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              values="0; 100; 0"
              keyTimes="0; 0.5; 1"
              dur="6s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>

    <nav>
      <app-navbar />
    </nav>
    <main class="pt-3 px-1">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
