import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private _issueNumber = signal<string | null>(null);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
  }));

  setIssueNumber(issueNumber: string) {
    this._issueNumber.set(issueNumber);
  }
}
