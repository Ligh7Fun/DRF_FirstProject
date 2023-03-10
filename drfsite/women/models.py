from django.db import models


class Women(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name='Заголовок',
    )
    content = models.TextField(
        blank=True,
        verbose_name='Текст статьи',
    )
    time_create = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Время создания',
    )
    time_update = models.DateTimeField(
        auto_now=True,
        verbose_name='Время изменения',
    )
    is_published = models.BooleanField(
        default=True,
        verbose_name='Опубликовано?',
    )
    cat = models.ForeignKey(
        'Category',
        on_delete=models.PROTECT,
        # null=True,
        verbose_name='Категория',
    )

    class Meta:
        verbose_name = "Известные женщины"
        verbose_name_plural = "Девушки"
        ordering = ['-time_create', 'title']

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        db_index=True,
        verbose_name='Категория',
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ['id']

    def __str__(self):
        return self.name
