import React from 'react';
import { Check } from 'lucide-react';
import { PRICING_TIERS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
        <p className="text-slate-500">Start for free, upgrade when you need more power.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {PRICING_TIERS.map((tier) => (
          <div 
            key={tier.name}
            className={`relative p-8 rounded-2xl border ${
              tier.highlight 
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xl' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            {tier.highlight && (
              <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            )}
            
            <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              {tier.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-serif font-bold">{tier.price}</span>
              <span className={`text-sm ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${tier.highlight ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Check size={12} />
                  </div>
                  <span className={tier.highlight ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-all ${
               tier.highlight
                 ? 'bg-white text-slate-900 hover:bg-slate-100'
                 : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900'
            }`}>
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center text-slate-400 text-sm mt-12">
        Payments are securely processed by Stripe. (Mock integration for demo)
      </p>
    </div>
  );
};

export default Pricing;