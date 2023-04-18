import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMemberTagsComponent } from './manage-member-tags.component';

describe('ManageMemberTagsComponent', () => {
  let component: ManageMemberTagsComponent;
  let fixture: ComponentFixture<ManageMemberTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMemberTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMemberTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
