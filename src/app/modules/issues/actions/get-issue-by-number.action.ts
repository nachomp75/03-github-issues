import { environment } from 'src/environments/environment.development';
import { GitHubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GitHubIssue> => {
  try {
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) throw "Can't load issue";

    const issue = await res.json();

    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
