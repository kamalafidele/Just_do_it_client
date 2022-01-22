import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTopicComponent } from './specific-topic.component';

describe('SpecificTopicComponent', () => {
  let component: SpecificTopicComponent;
  let fixture: ComponentFixture<SpecificTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
