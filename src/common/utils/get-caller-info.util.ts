import { GetCallerInfoResponse } from 'src/grpc/common/common_exceptions.pb';

export function getCallerInfo(level: number = 2): GetCallerInfoResponse {
  const stack = new Error().stack;

  if (!stack) return {};

  const stackLines = stack.split('\n');

  const callerLine = stackLines[level + 1] || '';

  if (!callerLine) return {};

  const match = callerLine.trim().match(/at\s+(.*?)\s+\(/);

  if (!match) return {};

  const fullMethod = match[1];
  const parts = fullMethod.split('.');

  return {
    class_name: parts.length > 1 ? parts[0] : undefined,
    method_name: parts[parts.length - 1],
  };
}
