describe('App', () => {
    it('should say greeting', () => {
        expect(document.querySelector('body').innerText)
            .toContain('Hello world.');
    });
});