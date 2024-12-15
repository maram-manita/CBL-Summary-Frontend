#backend\api\urls.py
from django.urls import path
from .views import ReportListView, SummarizeView

urlpatterns = [
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('summarize/', SummarizeView.as_view(), name='summarize'),
    
]
