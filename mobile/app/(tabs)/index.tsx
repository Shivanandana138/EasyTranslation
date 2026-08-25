import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function HomeScreen() {
  const API_URL = 'http://192.168.18.80:8000';

  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);


  const handleTranslate = async () => {
  if (!inputText.trim()) {
    return;
  }

  try {
    setIsTranslating(true);
    setTranslation('');

    const response = await fetch(`${API_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputText,
        source_language: 'auto',
        target_language: 'malayalam',
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    setTranslation(data.translation);
  } catch (error) {
    console.error('Translation error:', error);

    setTranslation(
      'Unable to translate right now. Please check your connection.'
    );
  } finally {
    setIsTranslating(false);
  }
};

  const handleClear = () => {
    setInputText('');
    setTranslation('');
  };
  const handleCopy = async () => {
  if (!translation) {
    return;
  }

  await Clipboard.setStringAsync(translation);
};
const handleListen = async () => {
  if (!translation) {
    return;
  }

  Speech.stop();

  Speech.speak(translation, {
    language: 'ml-IN',
    rate: 0.85,
    pitch: 1.0,
  });
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>

          <View>
            <Text style={styles.appName}>EasyTranslation</Text>
            <Text style={styles.tagline}>
              Simple translations, made easy.
            </Text>
          </View>
        </View>

        {/* Language information */}
        <View style={styles.languageRow}>
          <Text style={styles.languageText}>Kannada</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.languageText}>Malayalam</Text>
        </View>

        {/* Input section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your text</Text>

            {inputText.length > 0 && (
              <Pressable onPress={handleClear}>
                <Text style={styles.clearText}>Clear</Text>
              </Pressable>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Type Kannada, Kanglish or English..."
            placeholderTextColor="#999"
            multiline
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical="top"
          />

          <Text style={styles.characterCount}>
            {inputText.length} characters
          </Text>
        </View>

        {/* Translate button */}
       <Pressable
  style={({ pressed }) => [
    styles.translateButton,
    pressed && styles.buttonPressed,
    isTranslating && styles.buttonDisabled,
  ]}
  onPress={handleTranslate}
  disabled={isTranslating}
>
  <Text style={styles.translateButtonText}>
    {isTranslating ? 'Translating...' : 'Translate'}
  </Text>
</Pressable>
        {/* Output section */}
        <View style={styles.outputCard}>
          <Text style={styles.translateButtonText}>
           {isTranslating ? 'Translating...' : 'Translate'}
          </Text>
          {translation ? (
            <Text style={styles.translationText}>{translation}</Text>
          ) : (
            <Text style={styles.placeholderText}>
              Your Malayalam translation will appear here.
            </Text>
          )}

          {translation && (
            <View style={styles.actionRow}>
              <Pressable
                style={styles.actionButton}
                onPress={handleCopy}>
            
                 <Text style={styles.actionText}>Copy</Text>
              </Pressable>

             <Pressable
  style={styles.actionButton}
  onPress={handleListen}
>
  <Text style={styles.actionText}>Listen</Text>
</Pressable>
            </View>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Kannada • Kanglish • English → Malayalam
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6C4AB6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
  },

  appName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#24212B',
  },

  tagline: {
    fontSize: 13,
    color: '#77727F',
    marginTop: 3,
  },

  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C4AB6',
  },

  arrow: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#999',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    minHeight: 220,
    borderWidth: 1,
    borderColor: '#ECE8F3',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#302C38',
  },

  clearText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6C4AB6',
  },

  input: {
    flex: 1,
    minHeight: 145,
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: '#24212B',
  },

  characterCount: {
    fontSize: 11,
    color: '#AAA5B0',
    textAlign: 'right',
  },

  translateButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#6C4AB6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },

  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
  opacity: 0.6,
},

  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  outputCard: {
    backgroundColor: '#F0EBFA',
    borderRadius: 18,
    padding: 20,
    minHeight: 170,
  },

  outputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#6C4AB6',
    marginBottom: 14,
  },

  translationText: {
    fontSize: 20,
    lineHeight: 30,
    color: '#282330',
  },

  placeholderText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#9993A4',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },

  actionButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  actionText: {
    color: '#6C4AB6',
    fontSize: 13,
    fontWeight: '600',
  },

  footerText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: '#9993A4',
  },
});