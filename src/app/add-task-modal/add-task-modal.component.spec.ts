import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModalComponent } from './add-task-modal.component';

describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
