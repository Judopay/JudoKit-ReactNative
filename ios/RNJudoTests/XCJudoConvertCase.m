//
//  XCJudoConvertCase.m
//  RNJudoTests
//

#import <XCTest/XCTest.h>
#import "NSDictionary+JudoConvert.h"

@interface XCJudoConvertCase : XCTestCase

@end

@implementation XCJudoConvertCase

- (void)testExample {
    NSDictionary *dict = [NSDictionary new];

    XCTAssertThrows([dict numberForKey:@"myKey"]);
}

@end
