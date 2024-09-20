import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssuesService } from './../../services/issues.service';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [CommonModule, LabelsSelectorComponent, IssueItemComponent],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onChangeState(newState: string) {
    const state =
      {
        [State.All]: State.All,
        [State.Open]: State.Open,
        [State.Closed]: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }
}
