import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingToggleComponent } from './streaming-toggle.component';

describe('StreamingToggleComponent', () => {
  let component: StreamingToggleComponent;
  let fixture: ComponentFixture<StreamingToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
