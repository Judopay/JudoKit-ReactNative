#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <UIKit/UIKit.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>

@interface SettingsJsonModule : NSObject <RCTBridgeModule, UIDocumentPickerDelegate>
@end

@implementation SettingsJsonModule {
  RCTPromiseResolveBlock _filePickResolve;
  RCTPromiseRejectBlock _filePickReject;
  UIDocumentPickerViewController *_picker;
}

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_METHOD(copyToClipboard:(NSString *)text)
{
  UIPasteboard.generalPasteboard.string = text ?: @"";
}

RCT_EXPORT_METHOD(pickJsonFile:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (_filePickReject) {
    _filePickReject(@"cancelled", @"File pick cancelled", nil);
  }

  _filePickResolve = [resolve copy];
  _filePickReject = [reject copy];

  NSArray<UTType *> *types = @[ UTTypeJSON, UTTypeText ];
  UIDocumentPickerViewController *picker =
      [[UIDocumentPickerViewController alloc] initForOpeningContentTypes:types asCopy:YES];
  picker.delegate = self;
  picker.allowsMultipleSelection = NO;
  _picker = picker;

  UIViewController *presenter = RCTPresentedViewController();
  if (!presenter) {
    _filePickResolve = nil;
    _filePickReject = nil;
    _picker = nil;
    reject(@"no_activity", @"No current view controller", nil);
    return;
  }

  [presenter presentViewController:picker animated:YES completion:nil];
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller
didPickDocumentsAtURLs:(NSArray<NSURL *> *)urls
{
  NSURL *url = urls.firstObject;
  NSError *readError = nil;
  NSString *json = nil;

  if (url) {
    BOOL shouldStopAccessing = [url startAccessingSecurityScopedResource];
    json = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:&readError];
    if (shouldStopAccessing) {
      [url stopAccessingSecurityScopedResource];
    }
  }

  RCTPromiseResolveBlock resolve = _filePickResolve;
  RCTPromiseRejectBlock reject = _filePickReject;
  _filePickResolve = nil;
  _filePickReject = nil;
  _picker = nil;

  if (json) {
    if (resolve) {
      resolve(json);
    }
    return;
  }

  if (reject) {
    reject(@"read_error", readError.localizedDescription ?: @"Failed to read file", readError);
  }
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController *)controller
{
  RCTPromiseRejectBlock reject = _filePickReject;
  _filePickResolve = nil;
  _filePickReject = nil;
  _picker = nil;
  if (reject) {
    reject(@"cancelled", @"File pick cancelled", nil);
  }
}

@end
