import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IS_IOS } from '../../Data/Constants';
import {
  importSettingsFromJson,
  SettingsImportError,
} from '../../Data/SettingsImporter/persist';
import { pickSettingsJsonFile } from '../../Native/SettingsJsonModule';
import { onErrorSnackbar, onSuccessSnackbar } from '../../Functions';

const TITLE = 'Import Settings from JSON';
const PLACEHOLDER = 'Paste JSON here…';

export interface ImportSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onImported?: () => void;
}

const ImportSettingsModal: FC<ImportSettingsModalProps> = ({
  visible,
  onClose,
  onImported,
}) => {
  const {
    colors: { text, card, border, primary },
  } = useTheme();
  const [json, setJson] = useState('');

  useEffect(() => {
    if (visible) {
      setJson('');
    }
  }, [visible]);

  const applyJson = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      onErrorSnackbar(
        new Error('Please enter the settings JSON or choose a file.')
      );
      return;
    }

    try {
      importSettingsFromJson(trimmed);
      onImported?.();
      onSuccessSnackbar('Settings imported successfully');
      onClose();
    } catch (error) {
      const message =
        error instanceof SettingsImportError
          ? error.message
          : error instanceof Error
            ? `Import failed: ${error.message}`
            : 'Import failed';
      onErrorSnackbar(new Error(message));
    }
  };

  const handleChooseFile = async () => {
    try {
      const fileJson = await pickSettingsJsonFile();
      if (fileJson === undefined) {
        return;
      }
      setJson(fileJson);
      applyJson(fileJson);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to read file';
      onErrorSnackbar(new Error(`Failed to read file: ${message}`));
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.flex}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable
            style={[styles.card, { backgroundColor: card }]}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={[styles.title, { color: text }]}>{TITLE}</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                testID="import-settings-text-view"
                accessibilityLabel="Import settings text view"
                style={[
                  styles.input,
                  {
                    color: text,
                    borderColor: border,
                  },
                ]}
                multiline
                textAlignVertical="top"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={PLACEHOLDER}
                placeholderTextColor="#6e6e6e"
                value={json}
                onChangeText={setJson}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                testID="import-settings-choose-file-button"
                onPress={handleChooseFile}
              >
                <Text style={[styles.button, { color: primary }]}>
                  Choose File
                </Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              <TouchableOpacity
                testID="import-settings-cancel-button"
                onPress={onClose}
              >
                <Text style={[styles.button, { color: primary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="import-settings-import-button"
                onPress={() => applyJson(json)}
              >
                <Text
                  style={[
                    styles.button,
                    styles.importButton,
                    { color: primary },
                  ]}
                >
                  Import
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    minHeight: 150,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: IS_IOS ? 'Menlo' : 'monospace',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  spacer: {
    flex: 1,
  },
  button: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  importButton: {
    fontWeight: '700',
  },
});

export default ImportSettingsModal;
