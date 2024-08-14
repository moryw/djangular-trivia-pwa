import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { TriviaService } from "../services/trivia.service"
import { Question, QuestionArray, Answer, CategoryArray } from "../interfaces/trivia.interface"
import { MatRadioChange } from "@angular/material/radio"

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.less']
})
export class TriviaComponent implements OnInit {
  answer: Answer|null = null
  amountOptions: Array<number>
  apiBaseUrl: string
  correctAnswers = 0
  categoryOptions: CategoryArray = []
  difficultyOptions: Array<string>
  disableRadioButtons = false
  disableNextButton = true
  question: Question|null = null
  questionNumber = 0
  selectedAmount: number | undefined
  selectedCategory: string | undefined
  selectedDifficulty: string | undefined
  selectedType: string | undefined
  triviaData: QuestionArray = []
  typeOptions: Array<string>

  constructor(private triviaService: TriviaService, private cdr: ChangeDetectorRef) {
    this.amountOptions = [ 10,15,20,25 ]
    this.apiBaseUrl = `https://opentdb.com/api.php?`
    this.difficultyOptions = [ 'Easy', 'Medium', 'Hard' ]
    this.selectedAmount = 10
    this.typeOptions = [ 'boolean', 'multiple']
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.triviaService.getCategories().subscribe(
      {
        next: (data) => {
          this.categoryOptions = data
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  getApiUrl() {
    let url = this.apiBaseUrl
    url += this.selectedAmount ? `amount=${this.selectedAmount}` : 'amount=10'
    url += this.selectedCategory ? `&category=${this.selectedCategory}` : ''
    url += this.selectedDifficulty ? `&difficulty=${this.selectedDifficulty.toLowerCase()}` : ''
    url += this.selectedType ? `&type=${this.selectedType}` : ''
    console.log('url: ', url)
    return url
  }

  getTrivia() {
    this.triviaService.getTrivia(this.getApiUrl()).subscribe({
        next: (data) => {
          this.triviaData = data
          this.getNextQuestion()
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  getNextQuestion() {
    if (this.triviaData.length) {
      const index = Math.floor(Math.random() * this.triviaData.length)
      this.question = this.triviaData[index]
      this.triviaData.splice(index, 1)
    } else {
      this.question = null
    }

    console.log('question: ', this.question)

    if (this.answer) {
      this.questionNumber++
      if (this.answer.is_correct) {
        this.correctAnswers++
      }
    }

    this.answer = null
    this.disableRadioButtons = false
    this.disableNextButton = true 
  }

  getCorrectAnswer() {
    if (this.question) {
      return this.question.answers.filter(answer => answer.is_correct)[0].answer
    }
    return ''
  }

  getDifferentQuestions() {
    this.triviaData = []
    this.getNextQuestion()
  }

  answerSelected(event: MatRadioChange) {
    this.disableRadioButtons = true
    this.disableNextButton = false
  }

}