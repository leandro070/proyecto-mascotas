import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesMascotasComponent } from './mensajes-mascotas.component';

describe('MensajesMascotasComponent', () => {
  let component: MensajesMascotasComponent;
  let fixture: ComponentFixture<MensajesMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
