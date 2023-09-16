import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaRenderComponent } from './schema-render.component';

describe('SchemaRenderComponent', () => {
  let component: SchemaRenderComponent;
  let fixture: ComponentFixture<SchemaRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
