import { TestBed } from '@angular/core/testing';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { IssuesService } from './issues.service';
import { State } from '../interfaces';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false,
      },
      providers: [provideAngularQuery(queryClient)],
    });

    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30);

    const [label] = data!;
    expect(typeof label.id).toBe('number');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
    expect(typeof label.name).toBe('string');
    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
  });

  it('should set selected state', async () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);
    const { data } = await service.issuesQuery.refetch();
    expect(data!.every(({ state }) => state === State.Closed)).toBeTrue();
  });

  it('should set selected labels', async () => {
    const label = 'Accessibility';
    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeTrue();

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeFalse();
  });

  it('should set selected labels and get issues by label', async () => {
    const label = 'Accessibility';
    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeTrue();

    const { data } = await service.issuesQuery.refetch();
    data?.forEach((issue) =>
      expect(issue.labels.some(({ name }) => name === label)).toBeTrue()
    );
  });
});
