import { hash, compare } from 'bcrypt'
import { Injectable } from '@nestjs/common';

console.log('bcrypt: ', hash, compare)

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
