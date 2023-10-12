import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, 12);

    return hashedPassword;
};
