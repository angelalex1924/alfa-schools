"use client"

import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'

export default function RichTextEditorDemo() {
  const [content, setContent] = useState(`
    <h1>Καλώς ήρθατε στον Rich Text Editor!</h1>
    <p>Αυτός είναι ένας <strong>πλούσιος text editor</strong> με πολλές δυνατότητες:</p>
    
    <h2>Μορφοποίηση Κειμένου</h2>
    <p>Μπορείτε να κάνετε κείμενο <strong>bold</strong>, <em>italic</em>, <u>υπογραμμισμένο</u> και <s>διαγραμμένο</s>.</p>
    
    <h3>Λίστες</h3>
    <ul>
      <li>Bullet list item 1</li>
      <li>Bullet list item 2</li>
      <li>Bullet list item 3</li>
    </ul>
    
    <ol>
      <li>Numbered list item 1</li>
      <li>Numbered list item 2</li>
      <li>Numbered list item 3</li>
    </ol>
    
    <h3>Quote</h3>
    <blockquote>
      "Η γνώση είναι δύναμη, αλλά η εφαρμογή της γνώσης είναι η αληθινή δύναμη."
    </blockquote>
    
    <h3>Code Block</h3>
    <pre><code>function hello() {
  console.log("Hello, World!");
  return "Success!";
}</code></pre>
    
    <h3>Table</h3>
    <table>
      <thead>
        <tr>
          <th>Κεφαλίδα 1</th>
          <th>Κεφαλίδα 2</th>
          <th>Κεφαλίδα 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Κελί 1</td>
          <td>Κελί 2</td>
          <td>Κελί 3</td>
        </tr>
        <tr>
          <td>Κελί 4</td>
          <td>Κελί 5</td>
          <td>Κελί 6</td>
        </tr>
      </tbody>
    </table>
    
    <h3>Links</h3>
    <p>Εδώ είναι ένας <a href="https://example.com" target="_blank" rel="noopener noreferrer">σύνδεσμος</a>.</p>
    
    <h3>Images</h3>
    <p>Μπορείτε να εισάγετε εικόνες από URLs.</p>
    
    <h3>Videos</h3>
    <p>Μπορείτε να εισάγετε YouTube και Vimeo videos.</p>
  `)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Rich Text Editor Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Δοκιμάστε όλες τις δυνατότητες του editor παρακάτω:
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Editor
          </h2>
          <div className="min-h-[600px]">
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Γράψτε εδώ..."
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            HTML Output
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {content}
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Preview
          </h2>
          <div 
            className="rich-text-editor prose prose-lg max-w-none p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  )
}
