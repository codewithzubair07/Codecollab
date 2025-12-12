import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingSection = () => {
  const [currentPlan] = useState({
    name: 'Pro Developer',
    price: 29,
    billing: 'monthly',
    features: [
      'Unlimited private repositories',
      'Advanced 3D workspace themes',
      'Priority customer support',
      'Team collaboration tools',
      'Advanced integrations',
      'Custom workspace environments'
    ],
    nextBilling: '2025-08-11',
    status: 'active'
  });

  const [billingHistory] = useState([
    {
      id: 1,
      date: '2025-07-11',
      description: 'Pro Developer - Monthly',
      amount: 29.00,
      status: 'paid',
      invoice: 'INV-2025-001'
    },
    {
      id: 2,
      date: '2025-06-11',
      description: 'Pro Developer - Monthly',
      amount: 29.00,
      status: 'paid',
      invoice: 'INV-2025-002'
    },
    {
      id: 3,
      date: '2025-05-11',
      description: 'Pro Developer - Monthly',
      amount: 29.00,
      status: 'paid',
      invoice: 'INV-2025-003'
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '09/25',
      isDefault: false
    }
  ]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billing: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 public repositories',
        'Basic 3D workspace',
        'Community support',
        'Standard integrations'
      ],
      limitations: [
        'No private repositories',
        'Limited collaboration features'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Developer',
      price: 29,
      billing: 'monthly',
      description: 'For professional developers',
      features: [
        'Unlimited private repositories',
        'Advanced 3D workspace themes',
        'Priority customer support',
        'Team collaboration tools',
        'Advanced integrations',
        'Custom workspace environments'
      ],
      popular: true
    },
    {
      id: 'team',
      name: 'Team',
      price: 99,
      billing: 'monthly',
      description: 'For development teams',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Advanced analytics',
        'Custom branding',
        'SSO integration',
        'Dedicated account manager'
      ]
    }
  ];

  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const handlePlanChange = async (planId) => {
    setIsChangingPlan(true);
    setSelectedPlan(planId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPlan(false);
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Simulate invoice download
    console.log('Downloading invoice:', invoiceId);
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription, billing information, and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Crown" size={20} />
          <span>Current Plan</span>
        </h4>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h5 className="text-xl font-bold text-foreground">{currentPlan.name}</h5>
              <span className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-primary mb-1">
              ${currentPlan.price}
              <span className="text-sm font-normal text-muted-foreground">/{currentPlan.billing}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Next billing date: {new Date(currentPlan.nextBilling).toLocaleDateString()}
            </p>
            
            <div className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button variant="outline" iconName="Edit" iconPosition="left">
              Change Plan
            </Button>
            <Button variant="ghost" iconName="X" iconPosition="left">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Package" size={20} />
          <span>Available Plans</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border rounded-xl p-6 transition-all duration-300 spring ${
                plan.popular
                  ? 'border-primary bg-primary/5 shadow-elevated'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h5 className="text-lg font-bold text-foreground mb-1">{plan.name}</h5>
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.billing}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} color="var(--color-success)" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan.limitations?.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="X" size={14} color="var(--color-error)" />
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>
              
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                loading={isChangingPlan && selectedPlan === plan.id}
                onClick={() => handlePlanChange(plan.id)}
                fullWidth
                disabled={selectedPlan === plan.id}
              >
                {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="CreditCard" size={20} />
          <span>Payment Methods</span>
        </h4>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getCardIcon(method.brand)} size={18} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{method.brand}</span>
                    <span className="text-sm text-muted-foreground">•••• {method.last4}</span>
                    {method.isDefault && (
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button variant="ghost" size="sm">
                    Set Default
                  </Button>
                )}
                <Button variant="ghost" size="sm" iconName="Edit2">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Trash2">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Receipt" size={20} />
          <span>Billing History</span>
        </h4>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm text-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{transaction.description}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'paid' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => handleDownloadInvoice(transaction.invoice)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Information */}
      <div className="glass border border-border rounded-xl p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={20} />
          <span>Billing Information</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-foreground mb-2">Billing Address</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>John Developer</p>
              <p>123 Developer Street</p>
              <p>San Francisco, CA 94105</p>
              <p>United States</p>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-foreground mb-2">Tax Information</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Tax ID: Not provided</p>
              <p>VAT Number: Not applicable</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" iconName="Edit" iconPosition="left">
            Update Billing Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;