import { JoinPoint, REQUEST_OBJ_CTX_KEY, createCustomMethodDecorator } from '@midwayjs/core';
import { UserContext } from '../common/user-context';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';

type ProtectedMetadata = {
  roles?: Array<string>;
};

// 装饰器key
export const METHOD_PROTECTED = 'decorator_method:protected';

/**
 * @name Protected
 * @description 方法装饰器。被装饰的方法受身份认证保护，未登录将抛出异常返回。
 * @param metadata
 */
export function Protected(metadata?: ProtectedMetadata): MethodDecorator {
  return createCustomMethodDecorator(METHOD_PROTECTED, metadata);
}

// 装饰器具体实现
export function ProtectedFunc(options: { metadata: ProtectedMetadata }) {
  return {
    around: async (joinPoint: JoinPoint) => {
      // 装饰器所在的实例
      const instance = joinPoint.target;
      // 实例特定属性获取当前上下文
      const ctx = instance[REQUEST_OBJ_CTX_KEY];

      // 登录用户信息校验
      const userContext = ctx.session.userContext as UserContext;
      if (!userContext || !userContext.userId || !userContext.username) {
        throw new UnauthorizedError('身份验证失败');
      }

      // 登录用户权限校验
      const metadataObj = options.metadata;
      if (metadataObj) {
        const roles = ctx.session.userContext.role;
        console.log(roles);
      }

      return await joinPoint.proceed(...joinPoint.args);
    },
  };
}
