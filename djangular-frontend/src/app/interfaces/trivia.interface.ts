export interface Answer {
  answer: string,
  is_correct: boolean
}

interface AnswerArray extends Array<Answer> { }

export interface Question {
  question: string,
  category: string,
  answers: AnswerArray
}

export interface QuestionArray extends Array<Question> { }

export interface Category {
  id: number,
  name: string
}

export interface CategoryArray extends Array<Category> { }

export interface ApiCategoryRes {
  trivia_categories: CategoryArray
}

export interface ApiQuestionsRes {
  results: QuestionArray
}