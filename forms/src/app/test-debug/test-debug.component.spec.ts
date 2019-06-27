import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDebugComponent } from './test-debug.component';

describe('TestDebugComponent', () => {
  let component: TestDebugComponent;
  let fixture: ComponentFixture<TestDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
