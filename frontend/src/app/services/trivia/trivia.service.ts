import { Injectable } from '@angular/core'
import { map, Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"

import { ApiCategoryRes, ApiQuestionsRes, CategoryArray, Question, QuestionArray } from "../../interfaces/trivia.interface"
import { shuffleArray } from '../../utils/arrays'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'


@Injectable({
  providedIn: 'root'
})

export class TriviaService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getTrivia(url: string): Observable<QuestionArray> {
    return this.http.get<ApiQuestionsRes>(url)
      .pipe(
        map(response => response.results.map((item: any) => this.formatQuestion(item)))
      )
  }

  getCategories(): Observable<CategoryArray> {
    return this.http.get<ApiCategoryRes>('https://opentdb.com/api_category.php')
      .pipe(
        map(response => response.trivia_categories)
      )
  }

  private formatQuestion(item: any): Question {
    const allAnswers = [
      ...item.incorrect_answers.map((answer: string) => ({ answer: this.sanitizeHtml(answer) as string, is_correct: false })),
      { answer: this.sanitizeHtml(item.correct_answer) as string, is_correct: true }
    ]

    return {
      question: this.sanitizeHtml(item.question) as string,
      category: this.sanitizeHtml(item.category) as string,
      answers: shuffleArray(allAnswers)
    }
  }

  private sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}