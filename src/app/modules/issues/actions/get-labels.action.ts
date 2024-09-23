import { environment } from 'src/environments/environment.development';
import { GitHubLabel } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  try {
    const res = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) throw "Can't load labels";

    const labels = await res.json();

    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};
