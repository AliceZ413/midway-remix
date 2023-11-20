import { Rule, RuleType } from '@midwayjs/validate';

/**
 * Auth-Service and Auth-Controller Validate
 */
export class LoginDto {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
