---
layout: page
title: Tags
description: >
  按标签浏览所有博客文章
hide_description: true
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}

<div class="tags-expo">
  <div class="tags-expo-list">
    {% for tag in sorted_tags %}
    <a href="#{{ tag[0] | slugify }}" class="tag-link">{{ tag[0] }}</a>
    {% endfor %}
  </div>
  <hr/>
  <div class="tags-expo-section">
    {% for tag in sorted_tags %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
    <ul class="tags-expo-posts">
      {% for post in tag[1] %}
        <li>
          <a class="post-title" href="{{ site.baseurl }}{{ post.url }}">
            {{ post.title }}
          </a>
        </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>

<style>
  .tags-expo {
    margin-top: 2rem;
  }
  
  .tags-expo-list {
    margin-bottom: 1rem;
  }
  
  .tag-link {
    display: inline-block;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.5rem;
    background-color: #f1f1f1;
    border-radius: 3px;
    font-size: 0.9rem;
    text-decoration: none;
  }
  
  .tags-expo-section {
    margin-top: 2rem;
  }
  
  .tags-expo-section h2 {
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }
  
  .tags-expo-posts {
    list-style-type: none;
    padding-left: 0;
  }
  
  .tags-expo-posts li {
    margin-bottom: 0.5rem;
  }
</style> 