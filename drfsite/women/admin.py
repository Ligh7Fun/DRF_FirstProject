from django.contrib import admin

from women.models import Category, Women, Users


class WomenAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'cat',
        'time_create',
        'is_published',
    )
    list_display_links = (
        'id',
        'title',
    )
    search_fields = (
        'title',
        'content',
    )
    list_filter = (
        'is_published',
        'time_create',
    )


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )
    list_display_links = (
        'id',
        'name',
    )
    search_fields = (
        'name',
    )


class UsersAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'nick_name',
        'first_name',
        'last_name',
        'email',
        'password',
        'gender',
        'custom_gender',
    )
    list_display_links = (
        'nick_name',
        'first_name',
        'last_name',
    )
    search_fields = (
        'nick_name',
        'first_name',
        'last_name',
        'email',
        'gender',
        'custom_gender',
    )
    list_filter = (
        'gender',
        'custom_gender',
    )


admin.site.register(Women, WomenAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Users, UsersAdmin)