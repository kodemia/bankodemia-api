import { hash, compare } from 'bcrypt'
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
  private SALT_ROUNDS = 10 

  hash(textToHash): Promise<string> {
    return hash(textToHash, this.SALT_ROUNDS)
  }

  compare(textToCompare, encryptedText): Promise<boolean> {
    return compare(textToCompare, encryptedText)
  }
}
