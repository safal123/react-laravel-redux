@component('mail::message')
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-header">
                    Your Order Id: {{ $order->id }}
                </div>
                <div class="card-body">
                    Thanks for your order.
                    Order Id: {{ $order->id }} <br/>
                    Order Email: {{ $order->billing_email }}<br/>
                    Order Name: {{ $order->billing_name }}<br/>
                    Order Total: {{ $order->billing_total }}
                    # Order received
                    You can get further details about your order by logging into our website.
                    @component('mail::button', ['url' => config('app.url'), 'color' =>'green' ])
                        Go to website
                    @endcomponent
                    Thanks for choosing us.
                    {{ config('app.name') }}
                </div>
            </div>
        </div>
    </div>
@endcomponent
