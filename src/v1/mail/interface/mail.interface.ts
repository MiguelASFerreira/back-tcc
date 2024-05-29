import { Address } from "nodemailer/lib/mailer";

export type SendEmailResetPasswordNodemailerdDTO = {
    from?: Address;
    recipients: Address[];
    subject: string;
    html: string;
    text?: string;
    placeholderReplacements?: Record<string, string>;
}

export type SendEmailResetPasswordMailTrapDTO = {
    from?: {
        name: string,
        email: string
    };
    recipients: {
        email: string
    }[];
    subject?: string;
    html?: string;
    text?: string;
    template_uuid?: string;
    template_variables?: Record<string, string>;
}