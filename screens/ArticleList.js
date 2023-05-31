import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isItalian, setIsItalian] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/Federick2104/articles-api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  }, []);

  const toggleLanguage = () => {
    setIsItalian((prev) => !prev);
  };

  const toggleArticle = (articleId) => {
    setExpandedArticles((prevExpanded) => {
      if (prevExpanded.includes(articleId)) {
        return prevExpanded.filter((id) => id !== articleId);
      } else {
        return [...prevExpanded, articleId];
      }
    });
  };

  const isArticleExpanded = (articleId) => {
    return expandedArticles.includes(articleId);
  };

  const getLocalizedText = (article) => {
    if (isItalian) {
      return {
        title: 'Titolo: ' + article.title_it,
        author: 'Autore: ' + article.author,
        description: article.description_it,
        content: article.content_it,
      };
    } else {
      return {
        title: 'Title: ' + article.title,
        author: 'Author: ' + article.author,
        description: article.description,
        content: article.content,
      };
    }
  };
  const handleLearnMore = (url) => {
    if (url) {
        Linking.openURL(url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
        <Text style={styles.languageToggleText}>{isItalian ? 'Switch to English' : 'Cambia in Italiano'}</Text>
      </TouchableOpacity>
      {articles.map((article) => (
        <TouchableOpacity
          key={article.id}
          style={styles.articleContainer}
          onPress={() => toggleArticle(article.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.articleTitle}>{getLocalizedText(article).title}</Text>
          <Text style={styles.articleAuthor}>{getLocalizedText(article).author}</Text>
          {isArticleExpanded(article.id) && (
            <>
              <Text style={styles.articleDescription}>{getLocalizedText(article).description}</Text>
              {article.image && (
                <Image source={{ uri: article.image }} style={styles.articleImage} resizeMode="cover" />
              )}
              <Text style={styles.articleContent}>{getLocalizedText(article).content}</Text>
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={() => handleLearnMore(article.link)}
                >
                  <Text style={styles.learnMoreButtonText}>Learn More</Text>
                </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  languageToggle: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  languageToggleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  articleAuthor: {
    fontSize: 14,
    marginBottom: 4,
    color: '#777777',
  },
  articleDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: '#555555',
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444444',
  },
  learnMoreButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  learnMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ArticleList;
