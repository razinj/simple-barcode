import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQrCodePage } from './generate-qr-code.page';

describe('GenerateQrCodePage', () => {
  let component: GenerateQrCodePage;
  let fixture: ComponentFixture<GenerateQrCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateQrCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQrCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
