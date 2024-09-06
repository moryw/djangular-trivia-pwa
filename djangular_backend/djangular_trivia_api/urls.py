from django.urls import path, include
from rest_framework import routers
from . import views
from trivia import views as trivia_views

router = routers.DefaultRouter()
router.register(r'questions', trivia_views.QuestionViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/login', views.login),
    path('api/v1/signup', views.signup),
    path('api/v1/test_token', views.test_token)
]