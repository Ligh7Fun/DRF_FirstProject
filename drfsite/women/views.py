from .serializers import WomenSerializer, CategorySerializer
from .models import Women, Category
from rest_framework.views import APIView
from rest_framework.response import Response
# from .serializers import WomenSerializer


class WomenAPIView(APIView):
    def get(self, request):
        w = Women.objects.all()
        return Response({'posts': WomenSerializer(w, many=True).data})

    def post(self, request):
        serializer = WomenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_new = Women.objects.create(
            title=request.data['title'],
            content=request.data['content'],
            cat_id=request.data['cat_id'],
        )
        return Response({'post': WomenSerializer(post_new).data})


class CategoryAPIView(APIView):
    def get(self, request):
        w = Category.objects.all()
        return Response({'cats': CategorySerializer(w, many=True).data})

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cat_new = Category.objects.create(
            name=request.data['name'],
        )
        return Response({'cat': CategorySerializer(cat_new).data})
