import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';
import { it, vi, expect, beforeEach } from 'vitest';
import { showError } from './dom';

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(htmlDocContent);
});

it('should add an error paragraph to the id="errors" element', () => {
	showError('Test');

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
	const testErrorMessage = 'Test';

	showError(testErrorMessage);

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph.textContent).toBe(testErrorMessage);
});
