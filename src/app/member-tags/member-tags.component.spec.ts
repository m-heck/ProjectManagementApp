import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTagsComponent } from './member-tags.component';

describe('MemberTagsComponent', () => {
  let component: MemberTagsComponent;
  let fixture: ComponentFixture<MemberTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
