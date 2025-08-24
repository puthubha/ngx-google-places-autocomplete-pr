import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
} from '@angular/core';

declare let google: any;

@Directive({
  selector: '[google-places-autocomplete]',
  exportAs: 'ngx-places',
  standalone: true,
})
export class GooglePlaceAutocompleteDirective implements AfterViewInit {
  @Input('options') options: any;
  @Input('placeDataFields') placeDataFields: string[] = [];
  @Output() onAddressChange: EventEmitter<any> = new EventEmitter();
  private autocomplete: any;
  public eventListener: any;
  public place: any;
  public originalInput: HTMLInputElement;

  constructor(private el: ElementRef, private ngZone: NgZone) {
    this.originalInput = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!this.options) this.options = {};

    this.initialize();
  }

  private isGoogleLibExists(): boolean {
    return !(!google || !google.maps || !google.maps.places);
  }

  private initialize(): void {
    if (!this.isGoogleLibExists())
      throw new Error('Google maps library can not be found');

    if (google.maps.places.PlaceAutocompleteElement) {
      const placeAutocompleteOptions = {
        ...this.options,
        inputElement: this.originalInput,
      };

      const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement(
        placeAutocompleteOptions
      );
      placeAutocomplete.id = this.el.nativeElement.id || 'place-autocomplete';
      placeAutocomplete.className = this.el.nativeElement.className;
      this.el.nativeElement.replaceWith(placeAutocomplete);

      placeAutocomplete.addEventListener(
        'gmp-select',
        //@ts-ignore
        async ({ placePrediction }) => {
          const place = placePrediction.toPlace();
          if (place) {
            await place.fetchFields({
              fields:
                this.placeDataFields.length > 0
                  ? this.placeDataFields
                  : ['formattedAddress', 'location', 'displayName'],
            });
            this.ngZone.run(() => {
              this.onAddressChange.emit(place);
            });
          }
        }
      );

      this.autocomplete = placeAutocomplete;
    }

    this.el.nativeElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (!event.key) {
          return;
        }

        let key = event.key.toLowerCase();

        if (key == 'enter' && event.target === this.el.nativeElement) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    );

    if (
      window &&
      window.navigator &&
      window.navigator.userAgent &&
      navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
    ) {
      setTimeout(() => {
        let containers = document.getElementsByClassName('pac-container');

        if (containers) {
          let arr = Array.from(containers);

          if (arr) {
            for (let container of arr) {
              if (!container) continue;

              container.addEventListener('touchend', (e) => {
                e.stopImmediatePropagation();
              });
            }
          }
        }
      }, 500);
    }
  }

  public reset(): void {
    const options = this.options;
    this.autocomplete.setComponentRestrictions(options.componentRestrictions);
    this.autocomplete.setTypes(options.types);
  }
}
