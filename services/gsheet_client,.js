import Axios from "axios";

const BASE_URL = "https://sheets.googleapis.com";
const spreadsheet = "1KQ8xCUF71Em3hFKk340mpD38Lmvs8rZhJC6E5nFC8NE";

const client = Axios.create({
  baseURL: BASE_URL,
  params: {
    key: process.env.GSHEET_KEY,
  },
});

export const Gsheet = {
  getQuestions: async () => {
    const fields = [];
    const questions = [];
    const {
      data: {
        sheets: [questionSheet],
      },
    } = await client.get(`/v4/spreadsheets/${spreadsheet}`, {
      params: { includeGridData: true },
    });
    const {
      data: [
        {
          rowData: [header, ...entries],
        },
      ],
    } = questionSheet;

    fields.push(...header.values.map(({ formattedValue }) => formattedValue));

    questions.push(
      ...entries.map((row) => {
        const entry = {};

        fields.forEach((_, index) => {
          const key = fields[index];
          const value = row.values[index].formattedValue;

          entry[key] = value;
        });

        return entry;
      })
    );

    return questions;
  },
};
