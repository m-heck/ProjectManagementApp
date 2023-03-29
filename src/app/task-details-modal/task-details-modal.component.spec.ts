import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsModalComponent } from './task-details-modal.component';

describe('TaskDetailsModalComponent', () => {
  let component: TaskDetailsModalComponent;
  let fixture: ComponentFixture<TaskDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
